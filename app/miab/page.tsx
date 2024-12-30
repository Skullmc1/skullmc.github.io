"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useRef } from "react";
import styles from "./miab.module.css";
import Bubbles from "../miab/Bubbles";
import Image from "next/image";
import ModernCursor from "@/components/ModernCursor";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface Message {
  id: string;
  content: string;
  created_at: string;
  bottleType?: number;
}

export default function MessageInABottle() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel("messages_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newMessage = {
              ...(payload.new as Message),
              bottleType: Math.floor(Math.random() * 3) + 1, // Random number 1-3
            };
            setMessages((prev) => [...prev, newMessage]);
            setTimeout(scrollToBottom, 100);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchMessages() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      const messagesWithBottles = (data || []).map((message) => ({
        ...message,
        bottleType: Math.floor(Math.random() * 3) + 1,
      }));

      setMessages(messagesWithBottles);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ content: newMessage }]);

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className={styles.container}>
      <Bubbles />
      <ModernCursor />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Message in a Bottle</h1>
          <p className={styles.subtitle}>
            Cast your thoughts into the digital sea
          </p>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.messagesContainer}>
            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className={styles.messageCard}>
                    <div className={styles.messageContent}>
                      <div className={styles.bottleAvatar}>
                        <Image
                          src={`/miab/images/bottle${message.bottleType}.png`}
                          alt="Bottle avatar"
                          width={40}
                          height={40}
                          priority
                        />
                      </div>
                      <div className={styles.messageText}>
                        <p>{message.content}</p>
                        <span className={styles.timestamp}>
                          {new Date(message.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.messageForm}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              maxLength={200}
              rows={3}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

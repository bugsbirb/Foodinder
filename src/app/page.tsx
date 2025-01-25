"use client"
import React, { useState } from "react";
import { SwipeCard } from "@/components/swipe";
import { profiles, type Profile } from "./data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, X, ThumbsDown } from "lucide-react";
import { LikedProfiles } from "./likes";
import { DislikedProfiles } from "./dislikes";
import { Navbar } from "@/components/nav";

export default function TinderClone() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [dislikedProfiles, setDislikedProfiles] = useState<Profile[]>([]);
  const [showLikedProfiles, setShowLikedProfiles] = useState(false);
  const [showDislikedProfiles, setShowDislikedProfiles] = useState(false);

  const handleSwipe = async (direction: "left" | "right") => {
    setLastDirection(direction);
    if (direction === "right") {
      await saveLikeDislike(direction); 
      setLikedProfiles((prev) => [...prev, currentProfile]);
    } else {
      setDislikedProfiles((prev) => [...prev, currentProfile]);
    }
    nextProfile();
  };

  const nextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const currentProfile: Profile = profiles[currentIndex];
  const saveLikeDislike = async (direction: "right") => {
    try {
      const response = await fetch("/api/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: currentProfile.name,
          foodId: currentProfile.id,
          avatar: currentProfile.image,
        }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error saving like:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
        {showLikedProfiles ? (
          <LikedProfiles profiles={likedProfiles} onClose={() => setShowLikedProfiles(false)} />
        ) : showDislikedProfiles ? (
          <DislikedProfiles profiles={dislikedProfiles} onClose={() => setShowDislikedProfiles(false)} />
        ) : (
          <>
            <div className="relative w-72 h-96">
              <SwipeCard key={currentProfile.id} profile={currentProfile} onSwipe={handleSwipe} />
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white text-red-500 hover:bg-red-100 hover:text-red-600 dark:bg-zinc-800"
                onClick={() => handleSwipe("left")}
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white text-green-500 hover:bg-green-100 hover:text-green-600 dark:bg-zinc-800"
                onClick={() => handleSwipe("right")}
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            {lastDirection && (
              <Card className="mt-4 p-4">
                <p>You swiped {lastDirection}!</p>
              </Card>
            )}
          </>
        )}
        <div className="flex space-x-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowLikedProfiles(true);
              setShowDislikedProfiles(false);
            }}
          >
            <Heart className="mr-2 h-4 w-4" />
            View Liked Profiles
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowDislikedProfiles(true);
              setShowLikedProfiles(false);
            }}
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            View Disliked Profiles
          </Button>
        </div>
        {(showLikedProfiles || showDislikedProfiles) && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setShowLikedProfiles(false);
              setShowDislikedProfiles(false);
            }}
          >
            Back to Swiping
          </Button>
        )}
      </div>
    </>
  );
}

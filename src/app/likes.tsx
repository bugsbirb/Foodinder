import type React from "react"
import type { Profile } from "./data"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LikedProfilesProps {
  profiles: Profile[]
  onClose: () => void
}

export const LikedProfiles: React.FC<LikedProfilesProps> = ({ profiles, onClose }) => {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Liked Profiles</h2>
        {profiles.length === 0 ? (
          <p>You haven't liked any profiles yet.</p>
        ) : (
          <ScrollArea className="h-[400px]">
            {profiles.map((profile) => (
              <div key={profile.id} className="flex items-center mb-4 p-2 hover:bg-gray-100 rounded">
                <img
                  src={profile.image || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">
                    {profile.name}, {profile.age}
                  </h3>
                  <p className="text-sm text-gray-600">{profile.bio}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}


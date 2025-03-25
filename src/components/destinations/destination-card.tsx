import Image from "next/image"

interface DestinationCardProps {
  name: string
  description: string
  imageUrl: string
}

export default function DestinationCard({
  name = "Qatar",
  description = "196 Place",
  imageUrl = "/placeholder.svg?height=60&width=60",
}: DestinationCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-xl lg:max-w-xs w-full">
      <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium text-base">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}


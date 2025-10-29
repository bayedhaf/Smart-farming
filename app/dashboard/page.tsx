import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function UserDashboard() {
  // Sample seed data with stages
  const seeds = [
    {
      id: 1,
      title: "Maize Hybrid A",
      description: "High yield, army high",
      image: "/farm1e.jpg",
      status: "Germinated", // Germination stage
    },
    {
      id: 2,
      title: "Wheat Improved",
      description: "Drought Tolerant, High Protein",
      image: "/farm22.jpg",
      status: "Ready for Planting",
    },
    {
      id: 3,
      title: "Soybean Select",
      description: "Pest Resistant",
      image: "/images.jpg",
      status: "Shared",
    },
  ];

  const statusColors: Record<string, string> = {
    "Germinated": "bg-green-200 text-green-800",
    "Ready for Planting": "bg-yellow-200 text-yellow-800",
    "Shared": "bg-blue-200 text-blue-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 p-6">
      {/* Hero Section */}   <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-green-700">
          Germination & Seed Sharing Dashboard
        </h1>
        <p className="text-lg md:text-xl text-green-800">
          Track germination, multiply seeds, and share for planting areas
        </p>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seeds.map((seed) => (
          <Card
            key={seed.id}
            className="bg-white hover:bg-green-50 transition-transform transform hover:scale-105 shadow-lg rounded-xl border-none"
          >
            <CardHeader className="p-0">
              <Image
                src={seed.image}
                alt={seed.title}
                width={500}
                height={300}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-bold text-green-700">{seed.title}</CardTitle>
              <CardDescription className="text-gray-700 mb-2">{seed.description}</CardDescription>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[seed.status]}`}
              >
                {seed.status}
              </span>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                View Details →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>


      <Button
        className="fixed bottom-6 right-6 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full w-14 h-14 text-2xl shadow-xl hover:scale-110 transition-transform"
        aria-label="Add Seed"
      >
        +
      </Button>
    </div>
  );
}

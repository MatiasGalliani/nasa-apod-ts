import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Apod = {
  title: string;
  explanation: string;
  url: string;
  date: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export default function App() {
  const [apod, setApod] = useState<Apod | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchApod() {
    setLoading(true);
    setError(null);
    setApod(null);

    try {
      const res = await fetch(`${API_URL}/apod`);
      if (!res.ok) {
        throw new Error(`Server status response: ${res.status}`);
      }
      const data: Apod = await res.json();
      setApod(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="dark min-h-screen bg-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-black border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-white">
            NASA'S ASTRONOMY PICTURE OF THE DAY
          </CardTitle>
          <CardDescription className="text-white/60">(APOD)</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            onClick={fetchApod}
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/80"
          >
            {loading ? "Loading..." : "Get link to the APOD"}
          </Button>

          {loading && (
            <>
              <Separator className="bg-white/20" />
              <Skeleton className="h-6 w-3/4 bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-2/3 bg-white/10" />
            </>
          )}

          {error && (
            <Alert className="bg-black border-white/40 text-white">
              <AlertTitle className="text-white">
                Something went wrong
              </AlertTitle>
              <AlertDescription className="text-white/70">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {apod && (
            <>
              <Separator className="bg-white/20" />

              <Badge
                variant="outline"
                className="border-white/40 text-white/80"
              >
                {apod.date}
              </Badge>

              <Card className="bg-black border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    {apod.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 leading-relaxed">
                    {apod.explanation}
                  </CardDescription>
                </CardHeader>
              </Card>
            </>
          )}
        </CardContent>

        {apod && (
          <CardFooter>
            <Button
              render={
                <a href={apod.url} target="_blank" rel="noopener noreferrer" />
              }
              variant="outline"
              className="w-full border-white/40 bg-black text-white hover:!bg-white hover:text-black"
            >
              Click here to see the image
            </Button>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}

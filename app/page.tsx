import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import  Link  from "next/link";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bienvenue sur Nexoria</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-6 mt-2">
        <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
          Welcome to Nexoria, your all-in-one productivity platform. Effortlessly manage your projects and tasks  and boost your workflow with AI-powered features. Get started by accessing your dashboard below.
        </p>
        <Link 
          href="/dashboard" 
          className={buttonVariants({size: "lg", variant: "outline"}) + " font-semibold rounded-lg shadow-sm border-primary/60 hover:bg-black hover:text-white transition px-8 py-3"}
        >
          Go to your dashboard
        </Link>
      </CardContent>
    </Card>
  )
}
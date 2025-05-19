import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import  Link  from "next/link";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bienvenue sur Nexoria</CardTitle>
      </CardHeader>
      <CardContent>
      <Link 
        href="/dashboard" 
        className={buttonVariants({size: "lg", variant: "outline"})}
      >
        Accéder à votre tableau de bord
      </Link>
      </CardContent>
    </Card>
  )
}
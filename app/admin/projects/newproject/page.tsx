import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import Form  from "next/form";

export default function Page() {
    return (
    <Form 
        action={async ()=> {
        "use server"
        }}
    >
        <Label>
            Project
            <Input name="project name" />
        </Label>
        <Label>
            Description
            <Input name="project description" />
        </Label>
        <Button type="submit">Create</Button>
    </Form>
    )
}
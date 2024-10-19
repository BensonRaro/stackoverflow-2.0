import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant={"destructive"}>Click me</Button>
      <Button variant={"ghost"}>Click me</Button>
      <Button size={"lg"}>Click me</Button>
    </div>
  );
}

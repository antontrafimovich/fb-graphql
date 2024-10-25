import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/dialog";

export default function Login() {
  return (
    <Dialog defaultOpen>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Here gonna be a login form</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

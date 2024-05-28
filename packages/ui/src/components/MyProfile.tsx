import CustomProfileUpdateForm from "./CustomProfileUpdateForm";
import OAuthProfileUpdateForm from "./OAuthProfileUpdateForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type Props = {
  userId: string;
  profileDetails:
    | {
        name: string | null;
        email: string;
        phoneNumber: string | null;
      }
    | null
    | undefined;
  accountDetails:
    | {
        provider: string | null;
      }
    | null
    | undefined;
};

export default function MyProfile({
  userId,
  profileDetails,
  accountDetails,
}: Props) {


  const ProfileForm = accountDetails?.provider ? (
    <OAuthProfileUpdateForm profileDetails={profileDetails} />
  ) : (
    <CustomProfileUpdateForm profileDetails={profileDetails} />
  );

  
  return (
    <Sheet>
      <SheetTrigger className=" bg-primary w-full py-2 rounded-lg text-background">
        My Profile
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>{ProfileForm}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

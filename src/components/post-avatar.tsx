import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { cld } from "../lib/cloudinary";
import { POST } from "../types";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { AdvancedImage } from "cloudinary-react-native";

export function PostAvatar({ post }: { post: POST }) {
  const avatar = cld.image(post.user.avatar_url || "default_user");
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())),
  );

  return (
    <AdvancedImage
      cldImg={avatar}
      className="w-12 aspect-square rounded-full"
    />
  );
}

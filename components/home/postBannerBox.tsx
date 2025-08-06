import { BannerIconBoxes } from "@/lib/dataWithJSX";
import IconBox from "../shared/IconBox";

const PostBannerBox = () => {
  return (
    <div className="container relative z-[3] px-0 md:mt-0 lg:-mt-0 lg:px-8">
      <div className="flex flex-wrap lg:flex-nowrap">
        {BannerIconBoxes.map((item) => {
          return (
            <IconBox
              key={`box${item.id}`}
              iconName={item.iconName}
              iconNameMobile={item.iconNameMobile}
              content={item.content}
              headline={item.headline}
              type={item.type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostBannerBox;

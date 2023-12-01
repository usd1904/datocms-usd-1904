import { StructuredText, renderNodeRule } from "react-datocms/structured-text";
import {
  isHeading,
  isParagraph,
  isListItem,
  isList,
} from "datocms-structured-text-utils";
import { DetailSectionModelDetailsField, FileField } from "@/graphql/generated";
import { Image as DatoImage } from "react-datocms";
import Highlighter from "@/components/Common/Highlighter";

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
    />
  </svg>
);

type Props = {
  details: DetailSectionModelDetailsField;
  image: FileField;
  imagePosition: boolean;
};

const DetailSection = ({ details, image, imagePosition }: Props) => {
  return (
    <section className="py-16 text-center md:py-20 lg:py-28 lg:text-start">
      <div className="container">
        <div className="-mx-4 flex flex-col items-center justify-center lg:flex-row lg:flex-wrap ">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {!imagePosition && image.responsiveImage && (
              <div className="relative h-64 overflow-hidden bg-gray-100 md:h-auto">
                <DatoImage
                  className="h-full w-full object-cover object-center"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                  data={image.responsiveImage}
                />
              </div>
            )}
            <div className="w-full">
              <div className="sm:ml-6 md:px-24 lg:px-0">
                <StructuredText
                  data={details.value}
                  renderNode={Highlighter}
                  customNodeRules={[
                    renderNodeRule(isHeading, ({ children, key }) => {
                      return (
                        <h3
                          className="mb-4 mt-9 font-bold text-xl text-black dark:text-white sm:text-2xl lg:text-xl xl:text-3xl"
                          key={key}
                        >
                          {children}
                        </h3>
                      );
                    }),
                    renderNodeRule(isParagraph, ({ children, key }) => {
                      return (
                        <p
                          className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed"
                          key={key}
                        >
                          {children}
                        </p>
                      );
                    }),
                    renderNodeRule(isListItem, ({ children, key }) => {
                      return (
                        <div
                          key={key}
                          className="mb-5 flex items-center gap-2 text-lg font-medium text-body-color"
                        >
                          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                            {checkIcon}
                          </span>
                          <div>{children}</div>
                        </div>
                      );
                    }),
                    renderNodeRule(isList, ({ children, key }) => {
                      return (
                        <div
                          key={key}
                          className="mb-6 mt-6 grid w-full grid-cols-2 gap-4 px-8 text-center md:px-0 lg:ml-0"
                        >
                          {children}
                        </div>
                      );
                    }),
                  ]}
                />
              </div>
            </div>
            {imagePosition && image.responsiveImage && (
              <div className="relative h-64 overflow-hidden bg-gray-100 md:h-auto">
                <DatoImage
                  className="h-full w-full object-cover"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                  data={image.responsiveImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;

import { PostRecord, SiteLocale, TagQuery } from "@/graphql/generated";
import SingleBlog from "./SingleBlog";
import { notFound } from "next/navigation";

type Props = {
  data: TagQuery;
  lng: SiteLocale;
};

const TagPosts = ({ data, lng }: Props) => {
  if (!data.tag) {
    notFound();
  }
  return (
    <section className="py-[32px]">
      <div className="width-full flex items-center justify-center gap-4">
        <h1 className="my-24 text-center font-sans text-2xl font-semibold uppercase tracking-widest text-gray-800 dark:text-white lg:text-4xl">
          Categoria <span className="text-yellow">{data.tag.tag}</span>
        </h1>
      </div>

      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {data.tag["_allReferencingPosts"].map((post) => (
            <div
              key={post.id}
              className="mb-10 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <SingleBlog blog={post as PostRecord} locale={lng} />
            </div>
          ))}
        </div>

        <div className="-mx-4 flex flex-wrap"></div>
      </div>
    </section>
  );
};

export default TagPosts;

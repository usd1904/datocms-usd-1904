import { PostRecord, SiteLocale } from "@/graphql/generated";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { Maybe } from "graphql/jsutils/Maybe";

type BlogProps = {
  blogData: PostRecord[];
  blogHeader: string;
  blogSubheader: Maybe<string>;
  locale: SiteLocale;
  posts: any;
};

const Blog = ({
  blogData,
  blogHeader,
  blogSubheader,
  locale,
  posts,
}: BlogProps) => {
  return (
    <section
      id="blog"
      className="bg-primary bg-opacity-5 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle title={blogHeader} paragraph={blogSubheader} center />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {posts.map(
            (blog: any, n: number) =>
              n < 3 && (
                <div key={blog.id} className="w-full">
                  <SingleBlog blog={blog} locale={locale} />
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;

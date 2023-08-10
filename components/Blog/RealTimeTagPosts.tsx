'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import TagPosts from './TagPosts';

export default function RealTimeTagPosts({
  locale,
  initialData,
  token,
  query,
  slug,
}: {
  locale: string;
  token: string;
  initialData: any;
  query: string;
  slug: string;
}) {
  const { data, error, status } = useQuerySubscription({
    query,
    variables: {
      locale,
      slug,
    },
    token,
    initialData,
    preview: true,
  });

  return <TagPosts lng={locale} data={data} />;
}
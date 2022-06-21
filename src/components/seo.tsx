import { Helmet } from 'react-helmet';

/* Defining the props that the component will take. */
interface SeoProps {
  title?: string;
  children?: React.ReactNode;
}

/**
 * It's a function that takes a title and children as props and returns a Helmet component with the
 * title prop set to the title prop passed in and the children prop set to the children prop passed in
 * @param {SeoProps}  - SeoProps - This is the type of the props that the component will receive.
 * @returns A React component that renders a Helmet component with a title prop.
 */
function SEO({ title, children }: SeoProps) {
  return (
    <>
      <Helmet>
        <title>{title && `${title} -`} Password Manager</title>
      </Helmet>
      {children}
    </>
  );
}

export default SEO;

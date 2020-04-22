import React from "react";

const Author = ({ isModal, ...props }) => {
  const Tag = props.href ? 'a' : 'span';

  return (
    <Tag
      css={{
        color: isModal ? 'white' : 'inherit',
        fontWeight: 500,
        textDecoration: 'none',

        ':hover': { textDecoration: 'underline' },
      }}
      {...props}
    />
  );
};


export const FooterCaption = (props) => {
  const { currentView, isModal } = props;
  const { caption, author } = currentView;

  return (
    <span>
      {author ? (
        <Author
          href={author.url}
          target={author.url ? '_blank' : null}
          isModal={isModal}
        >
          {author.name}
        </Author>
      ) : null}
      {author && caption ? ' - ' : null}
      {caption}
    </span>
  );
};
import React from 'react';
import styled from 'styled-components';

const ArticleTitleTap = styled.div``;

export type ArticleTitleProps = {
  title: string;
};

function ArticleTitle(props: ArticleTitleProps) {
  return (
    <div>
      <div>{props.title}</div>
    </div>
  );
}

export default ArticleTitle;

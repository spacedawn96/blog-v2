export const extractProtectedPostContent = PostContent => {
  delete PostContent.content;
  delete PostContent.html;
};

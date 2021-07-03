module.exports = {
  async rewrites() {
    return [
      {
        source: '/users/:path*',
        destination: 'https://localhost:4000/:path*',
      },
    ];
  },
};

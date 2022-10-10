const DATA = {
  reviews: [
    {
      id: '1',
      contentType: 'book',
      objectId: '1',
      rating: 5,
      text: 'Fellowship is the best!',
    },
    {
      id: '2',
      contentType: 'book',
      objectId: '1',
      rating: 5,
      text: 'One does not simply...',
    },
    {
      id: '3',
      contentType: 'book',
      objectId: '2',
      rating: 4,
      text: 'Two books, one more to go.',
    },
    {
      id: '4',
      contentType: 'book',
      objectId: '3',
      rating: 5,
      text: 'Long live the king!',
    },
  ],
};

export async function getReviews({ contentType, objectId }) {
  return DATA.reviews.filter(
    (review) =>
      review.contentType === contentType && review.objectId === objectId
  );
}

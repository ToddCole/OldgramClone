const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21492,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 12873,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 15137,
  },
];

// Render posts from data to keep the markup in sync with content changes.
const postsContainer = document.querySelector(".feed__posts");

const formatLikes = (count) =>
  `${count.toLocaleString()} ${count === 1 ? "like" : "likes"}`;

const createPostMarkup = (post, index) => `
  <article class="post" data-post-index="${index}" aria-labelledby="post-${index}-title">
        <header class="post__header">
            <img class="post__avatar" src="${post.avatar}" alt="Portrait of ${
  post.name
}">
            <div class="post__author">
                <h2 id="post-${index}-title" class="post__title">${
  post.name
}</h2>
                <p class="post__location">${post.location}</p>
            </div>
        </header>
        <figure class="post__media">
            <img class="post__image" src="${post.post}" alt="${
  post.name
}'s latest post">
        </figure>
        <section class="post__body">
            <ul class="post__actions" aria-label="Post actions">
                <li>
                    <button type="button" class="icon-button" aria-label="Like">
                        <img src="images/icon-heart.png" alt="">
                    </button>
                </li>
                <li>
                    <button type="button" class="icon-button" aria-label="Comment">
                        <img src="images/icon-comment.png" alt="">
                    </button>
                </li>
                <li>
                    <button type="button" class="icon-button" aria-label="Share via direct message">
                        <img src="images/icon-dm.png" alt="">
                    </button>
                </li>
            </ul>
            <section class="post__meta">
                <p class="post__likes"><strong>${formatLikes(
                  post.likes
                )}</strong></p>
                <p class="post__caption"><strong>${post.username}</strong> ${
  post.comment
}</p>
            </section>
        </section>
    </article>
`;

if (postsContainer) {
  postsContainer.innerHTML = posts.map(createPostMarkup).join("");

  // Update likes when a user double-clicks the post image, mimicking Instagram.
  postsContainer.addEventListener("dblclick", (event) => {
    const image = event.target.closest(".post__image");
    if (!image) {
      return;
    }

    const article = image.closest(".post");
    if (!article) {
      return;
    }

    const index = Number(article.dataset.postIndex);
    const post = posts[index];
    if (!post) {
      return;
    }

    post.likes += 1;
    const likesElement = article.querySelector(".post__likes strong");
    if (likesElement) {
      likesElement.textContent = formatLikes(post.likes);
    }
  });
}

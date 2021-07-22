const dummy = (blogs) => {
 return 1;
}

const totalLikes = (blogList) => {
  return blogList.reduce((accu, current) => accu += current['likes'], 0)
}

const favoriteBlog = (blogList) => {
  let fav = 0;
  let holder;
  blogList.forEach((e, i, a) => {
    if(e['likes'] > fav) {
      holder = e;
      fav = e['likes'];
    }
  })
  return holder;
}

const mostBlogs = (blogList) => {
  let authorList = [];
  blogList.forEach((e, i, a) => {
    if(!authorList.find((element) => element['author'] === e['author'])) {
      authorList.push({
        author: e['author'],
        blogs: 1
      })
    }else {
      let arrE = authorList.find((element) => element['author'] === e['author']);
      authorList[authorList.indexOf(arrE)]['blogs'] ++;
    }   
  })
  return authorList.sort((a, b) => b.blogs - a.blogs)[0];
}

const mostLikes = (blogList) => {
  let authorList = [];
  blogList.forEach((e, i, a) => {
    if(!authorList.find((element) => element['author'] === e['author'])) {
      authorList.push({
        author: e['author'],
        likes: e['likes']
      })
    }else {
      let arrE = authorList.find((element) => element['author'] === e['author']);
      authorList[authorList.indexOf(arrE)]['likes'] += e['likes'];
    }   
  })
  return authorList.sort((a, b) => b.likes - a.likes)[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
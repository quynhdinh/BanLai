import api from "zmp-sdk";

export const test = async () => {
  const { currentSize, limitSize } = await api.getStorageInfo({
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  });
};

// export const loadElectronicPostsFromCache = () =>
//   api.getStorage({
//     keys: ["electronicPos"],
//     success: (data) => {
//       console.log("success cache: ")
//       console.log("type cache " + typeof data)
//       const {electronicPosts} = data
//       return electronicPosts
//     },
//     fail: (error) => {
//       // xử lý khi gọi api thất bại
//       console.log(error);
//     }
//   });

export const loadElectronicPostsFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['electronicPosts'],
    success: (electronicPosts) => {
      if (electronicPosts) {
        console.log("have product in cache")
        console.log("in storage: "+"type "+ electronicPosts)
        resolve(electronicPosts)
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load products from cache. Details: ', error)
      resolve([])
    }
  })
})

export const saveElectronicPostsToCache = async (electronicPosts) => {
  await api.setStorage({
    data: {electronicPosts},
    fail: (error) =>
      console.log("Failed to save products to cache. Details: ", error),
  });
  return electronicPosts;
};

export const loadUserFromCache = () =>
  new Promise((resolve) => {
    api.getStorage({
      keys: ["user"],
      success: ({user}) => {
        if (user) {
          resolve(user);
        }
        resolve();
      },
      fail: (error) => {
        console.log("Failed to load user from cache. Details: ", error);
        resolve();
      },
    });
  });

export const saveUserToCache = async (user) => {
  await api.setStorage({
    data: {user},
    fail: (error) =>
      console.log("Failed to save user to cache. Details: ", error),
  });
  return user;
};

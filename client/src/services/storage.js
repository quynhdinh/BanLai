import api from "zmp-sdk";

export const loadElectronicPostsFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['electronicPosts'],
    success: ({electronicPosts}) => {
      if (electronicPosts) {
        console.log("electronicPosts cache hit!")
        resolve({electronicPosts})
      } else {
        console.log("electronicPosts cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load electronics from cache. Details: ', error)
      resolve([])
    }
  })
})

export const loadhouseItemPostsFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['houseItemPosts'],
    success: ({houseItemPosts}) => {
      if (houseItemPosts) {
        console.log("houseItemPosts cache hit!")
        resolve({houseItemPosts})
      } else {
        console.log("houseItemPosts cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load house items from cache. Details: ', error)
      resolve([])
    }
  })
})

export const saveElectronicPostsToCache = async electronicPosts => {
  await api.setStorage({
    data: {electronicPosts},
    fail: (error) =>
      console.log("Failed to save electrics to cache. Details: ", error),
  });
  return electronicPosts;
};

export const saveHouseItemPostsToCache = async houseItemPosts => {
  await api.setStorage({
    data: {houseItemPosts},
    fail: (error) =>
      console.log("Failed to save house items to cache. Details: ", error),
  });
  return houseItemPosts;
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

export const loadMessagesFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['messages'],
    success: (m) => {
      if (m.messages) {
        console.log("[messages] cache hit!")
        resolve(m)
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load messages from cache. Details: ', error)
      resolve([])
    }
  })
})

export const saveMessagesToCache = async m => {
  await api.setStorage({
    data: {messages: m},
    fail: (error) =>
      console.log("Failed to save messages to cache. Details: ", error),
  });
  return m;
};

export const loadMyPostsFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['myPosts'],
    success: (m) => {
      if (m.myPosts) {
        console.log("[myPosts] cache hit!")
        resolve(m)
      } else {
        console.log("[myPosts] cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load messages from cache. Details: ', error)
      resolve([])
    }
  })
})

export const saveMyPostsToCache = async p => {
  await api.setStorage({
    data: {myPosts: p},
    fail: (error) =>
      console.log("Failed to save my posts to cache. Details: ", error),
  });
  return p;
};

export const loadCareListFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['carelist'],
    success: (m) => {
      if (m.carelist) {
        console.log("[carelist] cache hit!")
        resolve(m)
      } else {
        console.log("[carelist] cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load carelist from cache. Details: ', error)
      resolve([])
    }
  })
})

export const saveCareListToCache = async p => {
  await api.setStorage({
    data: {carelist: p},
    fail: (error) =>
      console.log("Failed to save care list to cache. Details: ", error),
  });
  return p;
};

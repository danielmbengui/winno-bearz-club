let address = "yes";
let address1 = "okay";
let address2 = "WinnoBearz";
let address3 = "0x2Ea4f1b9a0a98d64B3521De03C2073e97552DC74";
const allAddress = [address, address1, address2, address3];

export function getAllCollectionAdresses() {
    //const fileNames = fs.readdirSync(postsDirectory)
  
    /*
  // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..')
    const posts = await res.json()
    return posts.map(post => {
      return {
        params: {
          id: post.id
        }
      }
    })
    */
    return allAddress.map(address => {
      return {
        params: {
          id: address.toLowerCase(),
        }
      }
    })
  }

  export async function getCollection(address) {
    //const fileNames = fs.readdirSync(postsDirectory)
    
    /*
  // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..')
    const posts = await res.json()
    return posts.map(post => {
      return {
        params: {
          id: post.id
        }
      }
    })
    */
   let yes = "merde";
    return {
        address,
        yes,
        //contentHtml,
        //...matterResult.data
      }
  }
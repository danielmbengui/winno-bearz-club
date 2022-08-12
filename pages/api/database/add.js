import excuteQuery from "../../../components/Games/WinnoAndBees/lib/db";
export default async (req, res) => {
    try {
        
        console.log("req nom", process.env.NEXT_PUBLIC_MYSQL_HOST, process.env.NEXT_PUBLIC_MYSQL_PORT,process.env.NEXT_PUBLIC_MYSQL_USER)
      const result = await excuteQuery({
          //query: 'INSERT INTO whitelist_user(name) VALUES(?)',
          query: "SELECT * FROM WHITELIST_USER",
          //values: ['mama', 93, '0x200923193ed77BEAb040011580e89c66390CBBa2', false],
          //values: ['mama'],
      });
      console.log( "ttt",result );
      return res.status(200).json(result);
  } catch ( error ) {
      console.log( 'error', error );
      return res.status(404).json('meeerde'); // method not found
      //return res.status(405).json('meeerde'); // method not allowed
  }
  
  
  };

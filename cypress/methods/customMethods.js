class Methods{
    randomAddress(){
      const characters = 'abcdefghijklmnopqrstuvw';
      let address = '';
      for (let i = 0; i < 5; i++) {
        address += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      address += ' Albert Health';
      return address;
    }
    randomPhoneNumber(){
      const characters = '123456789';
      let number = '';
      for (let i = 0; i < 9; i++) {
        number += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      let mobileCode = '+966'
      return mobileCode + number;
    }
    randomName(){
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let name = '';
      for (let i = 0; i < 5; i++) {
        name += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return name;
    }
}

export default new Methods();


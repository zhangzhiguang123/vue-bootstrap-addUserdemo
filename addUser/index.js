const localData = window.localStorage;
let vm = new Vue({
  el: "#box",
  data: {
    list: [],
    isShow: true,
    userName: "",
    passWord: "",
    id: 0,
    del: "删除"
  },
  created(){
    for(let i=0;i<localData.length;i++){ //将本地存储加到list
       let key = localData.key(i);
       let data = JSON.parse(localData.getItem(key));
       this.list.push(data);
       if(data.id>this.id){
         this.id = data.id;
       }
    }
    this.id++;
  },
  computed: {
    newList() {
      return JSON.parse(JSON.stringify(this.list));
    }
  },
  watch: {         //与computed共同检测list的长度变化，解决数组变动新旧值相同问题
    newList: function (newlist, oldlist) {
      if (newlist.length !== 0) {
        this.isShow = false;
      } else {
        this.isShow = true;
      };
    }
  },
  methods: {
    addUser() {  //添加用户事件，添加用户到list和本地存储
      let thisUser = {};
      thisUser.id = this.id++;
      thisUser.username = this.userName;
      thisUser.password = this.passWord;
      thisUser.delet = this.del;
      this.list.push(thisUser);
      localData.setItem(thisUser.id,JSON.stringify(thisUser));
      this.userName = "";
      this.passWord = "";
    },
    delThis(index) {  //删除按钮事件，删除list相应元素，删除本地存储相应数据
      this.list.splice(index, 1);
      let delKey = localData.key(index);  //获取本地相应键
      localData.removeItem(delKey);
    },
    delAll() {    //删除全部按钮事件，清空list,清除本地数据
      this.list = [];
      localData.clear();
    },
    doReset() {          //重置按钮事件
      userName = "";
      passWord = "";
    }
  }
});
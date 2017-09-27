import { observable,action,computed } from 'mobx';


class MenuStore {
    @observable menuList = [];

    @action
    setMenuList(list) {
        this.menuList = list;
    }

}

export default MenuStore;



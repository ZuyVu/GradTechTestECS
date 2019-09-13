function getChildArray(menu, parent) {

  for (j= 0; j < menu.length; j++) {
    if(menu[j].title == parent) {
      return menu[j].data;
    }
  }

  var newParent = {title: parent, data: []}
  menu.push(newParent);

  return menu[menu.length - 1].data;

}

function createMenuData(data) {
  var menu = [];

  for (i = 0; i < data.length; i++) {
    var parentAndChild = data[i].split("/");
    var childs = getChildArray(menu, parentAndChild[0]);

    if(parentAndChild[1] != null) {
          childs.push(parentAndChild[1]);
    }
  }

  var result = [];
  for (i = 0; i < menu.length; i++) {
    if(menu[i].data.length != 0) {
      result.push(menu[i]);
    }
  }

  return result;
}

describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];

      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];

      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });

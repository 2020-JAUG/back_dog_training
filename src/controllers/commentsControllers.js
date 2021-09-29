const { Comments } = require("../models");
const { Post } = require("../models");

class Msj {
  constructor() {}

  async makeComment(comment) {
    return Comments.create(comment);
  }

  async comments_by_postId(postId) {
    return Comments.findAll({
      where: { postId: postId },
    });
  }

  async removeComment(data) {
    return Comments.destroy({ where: { id: data.id } });
  }
}

let commentsControllers = new Msj();
module.exports = commentsControllers;

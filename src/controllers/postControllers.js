const { Post } = require("../models");
const findByPk = require("../models");
const router = require("../routes/postRouter");

class Msj {
  constructor() {}

  async makePost(post) {
    return Post.create(post);
  }

  async findAllPost() {
    return Post.findAll();
  }

  async findPostByUserId(userId) {
    return Post.findAll({
      where: { userId: userId },
    });
  }

  async modifyPost(body) {
    //Datos que cambiamos
    return Post.update(
      {
        title: body.title,
        content: body.content,
      },
      //Donde
      { where: { id: body.id } }
    );
  }

  async removePost(postId, userId) {
    let post = await Post.findByPk(postId);
    if (post.userId === userId) {
      return Post.destroy({ where: { id: postId } });
    } else {
      throw new Error("Action canceled.");
    }
  }
}

let postControllers = new Msj();
module.exports = postControllers;

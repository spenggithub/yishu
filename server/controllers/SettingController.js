class SettingController{
  static async readMode(ctx){
    ctx.session.isNightMode = ctx.request.body.isNightMode
    ctx.body = {
      status:'0',
      msg:'success'
    }
  }
}
module.exports = SettingController;

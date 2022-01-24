const mongoose  = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, unique:true},
    level: Number,
    total:{type: Number, required:true},
    target:{type: Number, required:true},
    slug: { type: String, index: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'Category'
    },
    ancestors: [{
         _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            index: true
    },
         name: String,
         slug: String
    }]
    });

    function slugify(string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
      
        return string.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
      }

      CategorySchema.pre('save', async function (next) {
        this.slug = slugify(this.name);
        next();
     });

const model = mongoose.model( 'category' , CategorySchema)

// const tasks = mongoose.model('tasks' , schema)
module.exports = model
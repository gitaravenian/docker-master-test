export class BlogDTO {
    constructor(data) {
        this.title = data.title;
        this.content = data.content;
        this.categoryId = parseInt(data.categoryId);
        this.image = data.image;
        this.published = data.published === true || data.published === 'true';
        this.slug = data.slug;
        this.authorId = parseInt(data.authorId);
    }
}
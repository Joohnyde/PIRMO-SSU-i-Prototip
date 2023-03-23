import { GlobalVars } from "../GlobalVars";
import { PostService } from "../services/post.service";
import { PostShowcase } from "./postshowcase";

export class BPost {

    public naslovi!: string[];
    public kategorije: number = 0;
    public naslovnica!: string;
    public sadrzaji!: string[];
    public id :number = -1;

    constructor(post: PostShowcase | null,
        public postService: PostService | null){
        if(post != null){
            this.naslovi = post.naslovi;
            var tempKat = GlobalVars.kategorije as string[][];
            this.kategorije = tempKat[0].indexOf(post.kategorije[0]);
            this.id = parseInt(post.id);
            //if(this.bpost.id!=-1){
                if(this.postService)
                this.sadrzaji = this.postService.getPostContentById(this.id)
              //}

        }else{
            this.naslovi = ["","",""];
            this.sadrzaji = ["","",""];
        }
        
        this.naslovnica = "";
       
    }

    public refresh(post: PostShowcase | null){
        if(post != null){
            this.naslovi = post.naslovi;
            var tempKat = GlobalVars.kategorije as string[][];
            this.kategorije = tempKat[0].indexOf(post.kategorije[0]);
            this.id = parseInt(post.id);
            if(this.postService)
                this.sadrzaji = this.postService.getPostContentById(this.id);
        }else{
            this.id = -1;
            this.sadrzaji = ["","",""];
            this.naslovi = ["","",""];
            
        }
        this.naslovnica = "";
    }
  }
  
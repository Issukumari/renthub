import { Injectable } from '@angular/core';
import { Firestore, arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private readonly firestore: Firestore, private readonly auth: Auth) {}

  saveUserComment(userId: string, userName: string, description: string): Promise<any> {
    const userCommentRef = doc(this.firestore, `usercomment/${userId}`);

    const commentData = {
      userName,
      description,
      createdAt: new Date()
    };

    return updateDoc(userCommentRef, {
      comments: arrayUnion(commentData)
    }).catch(async (error) => {
      if (error.code === 'not-found') {
        await setDoc(userCommentRef, {
          comments: [commentData]
        });
      } else {
        throw error;
      }
    });
  }

  getUserComments(userId: string): Observable<any> {
    const userCommentRef = doc(this.firestore, `usercomment/${userId}`);
    
    return from(getDoc(userCommentRef).then(docSnapshot => {
      if (docSnapshot.exists()) {
        return docSnapshot.data()?.['comments'] || [];
      } else {
        return [];  
      }
    }));
  }
  savePost(data: any): Observable<any> {
    const postDocRef = doc(this.firestore, 'usercomment/createpostdata');
    return from(setDoc(postDocRef, data)); 
  }
  getPosts(): Observable<any> {
    const postDocRef = doc(this.firestore, 'usercomment/createpostdata');
  
    return from(getDoc(postDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return docSnapshot.data() || []; 
      } else {
        console.log("No posts found in createpost collection");
        return []; 
      }
    }));
  }
  
}

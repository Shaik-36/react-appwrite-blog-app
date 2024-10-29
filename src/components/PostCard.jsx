import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 transform transition-transform duration-300 hover:scale-105">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </Link>
  );
}


export default PostCard
import { addComment } from "../commentSlice"

export const addCommentByUser =  async(comment,dispatch,axiosJWT,accessToken,id) => {
    try {
        const res = await axiosJWT.post(`http://localhost:7000/api/comment/create/${id}`,comment,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(addComment(res.data))
    } catch (error) {
        console.log(error)
    }
}
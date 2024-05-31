import PromptCard from "./PromptCard";
import { PromptType } from "@models/prompt";

export interface ProfileProps{
  name: string;
  desc: string;
  data: PromptType[];
  handleEdit?:  (post:PromptType) => void;
  handleDelete?:   (post:PromptType) => void;
}

const Profile: React.FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}{"'s"} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post:PromptType) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
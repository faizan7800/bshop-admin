import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { LucideTrash2, Plus } from 'lucide-react';
import Image from 'next/image';

interface UploadImageProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onChange, onRemove, value }) => {

    const onUpload = (result: any)=>{
        onChange(result.info.secure_url)
    }
    return ( 
        <div>
            <div className='mb-4 flex flex-wrap items-center gap-4'>
                {
                    value.map((url)=>(
                        <div className='relative flex items-center justify-end h-[200] w-[200]'>
                        <Image src={url} alt='url image' className='object-cover rounded-lg ' width={200} height={200}/>
                        <Button className='absolute bg-red-1 text-white top-0 right-0' onClick={(url)=>{onRemove(`${url}`)}}><LucideTrash2/></Button>
                        </div>
                    ))
                }
            </div>
        <CldUploadWidget uploadPreset="k6we56zb" onSuccess={onUpload}>
            {({ open }) => {
                return (
                    <Button onClick={() => open()} className='bg-grey-1 text-white'> <Plus className='h-4 w-4 mr-2' />
                        Upload an Image
                    </Button>
                );
            }}
        </CldUploadWidget>
        </div>
    )
}

export default UploadImage
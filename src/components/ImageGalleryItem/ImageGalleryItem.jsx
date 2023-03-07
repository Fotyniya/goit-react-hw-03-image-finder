import {Image} from '../ImageGalleryItem/ImageGalleryItem.styled'

export const ImageGalleryItem = ({item}) => {
    return <>
    <Image src={item.webformatURL} alt={item.tags}/>
    </>
}

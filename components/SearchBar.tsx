import { IoSearch } from 'react-icons/io5'
import { useRecoilState } from 'recoil'
import { modalSearchQuery } from '../atoms/modalAtom'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useRecoilState(modalSearchQuery)
  return (
    <div className="w-full px-6 mx-auto my-8 md:px-12 md:w-2/3 ">
      <form className="flex items-center flex-1 max-w-2xl px-5 py-4 bg-white rounded-md border-orange-lightest drop-shadow-sm ">
        <IoSearch size={18} />
        <input
          className="flex-1 text-center bg-transparent outline-none placeholder-navy-light"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" hidden />
      </form>
    </div>
  )
}

export default SearchBar

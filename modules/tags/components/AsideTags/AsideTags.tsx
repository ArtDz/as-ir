import { TagCard } from '@/modules/tags/components'

export const AsideTags = () => {
  // Todo тут fixed неправильно, этот блок должен быть в общем контейнере и все. Его вообще не нужно на главную страницу выносить возможно.
  //  чтобы было больше места для публикаций. Протестировать оба варианта
  return (
    <>
      <aside className='fixed right-2.5 top-[calc(100vh-35%)] flex w-full max-w-72 flex-wrap gap-4 rounded-xl  border-cyan-400 bg-gray-500 p-4 shadow-lg'>
        <p>Популярные теги</p>
        {[1, 2, 3, 4, 5].map((item) => (
          <TagCard
            key={item}
            showCount
            _id={String(item)}
            name='Some name'
            posts={item}
          />
        ))}
      </aside>
    </>
  )
}

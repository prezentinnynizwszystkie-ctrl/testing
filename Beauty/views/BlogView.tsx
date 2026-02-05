
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, ChevronLeft } from 'lucide-react';
import { CardSkeleton } from '../components/Skeleton';
import { optimizeImg } from '../App';

const BlogCard = memo(({ post, setSelectedPost }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-[40px] overflow-hidden shadow-md border border-gray-100 flex flex-col h-full cursor-pointer group"
    onClick={() => setSelectedPost(post)}
  >
    <div className="h-56 w-full overflow-hidden relative">
      <img src={optimizeImg(post.image)} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute top-4 left-4"><span className="text-[9px] uppercase tracking-widest text-white font-bold px-3 py-1 bg-[#D4AF37] rounded-full">{post.category}</span></div>
    </div>
    <div className="p-8 flex flex-col flex-1">
      <h3 className="text-xl font-serif text-gray-800 mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">{post.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-3 italic">{post.excerpt}</p>
      <div className="flex items-center gap-2 text-[#5C4033] font-bold text-[10px] uppercase tracking-widest">
        Czytaj więcej <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
));

const BlogView: React.FC<any> = ({ posts, setView, isLoading = false }) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-12 md:max-w-screen-xl md:mx-auto md:px-12">
      <div className="relative h-64 md:h-[500px] w-full overflow-hidden rounded-b-[40px] md:rounded-[60px] shadow-lg mb-12">
        <img src={optimizeImg("https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/HeroPhotos/bloghero.webp", 1200)} className="w-full h-full object-cover" alt="Blog Hero" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
           <h1 className="text-4xl md:text-8xl font-serif text-white mb-4 tracking-tighter">Magazyn Piękna</h1>
           <p className="text-white/90 text-sm md:text-2xl italic font-handwritten">Ekskluzywna wiedza od ekspertów GalicaMed</p>
        </div>
        <div className="absolute top-24 left-6 z-20">
          <button onClick={() => setView('menu')} className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg">
            <ChevronLeft className="w-4 h-4" /> Wstecz
          </button>
        </div>
      </div>

      <div className="p-6 md:p-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? <CardSkeleton /> : posts.map((post: any) => (
            <BlogCard key={post.id} post={post} setSelectedPost={setSelectedPost} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="bg-white w-full max-w-4xl h-[95vh] sm:h-auto sm:max-h-[90vh] rounded-t-[40px] overflow-hidden relative shadow-2xl flex flex-col">
              <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 z-[160] p-3 bg-white/80 rounded-full shadow-lg"><X className="w-6 h-6 text-gray-800" /></button>
              <div className="overflow-y-auto flex-1 no-scrollbar pb-12">
                <div className="h-64 md:h-[450px] w-full overflow-hidden relative">
                  <img src={optimizeImg(selectedPost.image)} className="w-full h-full object-cover" alt={selectedPost.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="p-8 md:p-20 -mt-20 relative bg-white rounded-t-[40px]">
                   <div className="flex items-center gap-4 mb-8">
                     <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold px-4 py-1 border border-[#D4AF37] rounded-full">{selectedPost.category}</span>
                     <span className="text-gray-400 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedPost.readTime}</span>
                   </div>
                   <h2 className="text-3xl md:text-6xl font-serif text-gray-800 mb-12 tracking-tight leading-[1.1]">{selectedPost.title}</h2>
                   <div className="prose prose-sm md:prose-xl max-w-none text-gray-600 drop-cap font-serif leading-loose" dangerouslySetInnerHTML={{ __html: selectedPost.content?.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogView;

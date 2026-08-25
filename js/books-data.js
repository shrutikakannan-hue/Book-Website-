/**
 * Curated Library of Free Public Domain & Open Access Books
 * Complete with multi-chapter readable contents, metadata, and download links.
 */

const BOOKS_DATA = [
  {
    id: "alice-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    year: 1865,
    genre: "Fantasy",
    subGenres: ["Children", "Adventure", "Classics"],
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    color: "#6c5ce7",
    rating: 4.8,
    ratingsCount: 1420,
    pages: 148,
    readTime: "3.5 hrs",
    language: "English",
    featured: true,
    trending: true,
    description: "Follow Alice as she falls down a rabbit hole into a fantasy realm populated by peculiar, anthropomorphic creatures.",
    gutenbergId: 11,
    downloadUrl: "https://www.gutenberg.org/ebooks/11",
    chapters: [
      {
        title: "Chapter I: Down the Rabbit-Hole",
        content: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.

In another moment down went Alice after it, never once considering how in the world she was to get out again.

The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.

Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled "ORANGE MARMALADE", but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody underneath, so managed to put it into one of the cupboards as she fell past it.`
      },
      {
        title: "Chapter II: The Pool of Tears",
        content: `"Curiouser and curiouser!" cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); "now I'm opening out like the largest telescope that ever was! Good-bye, feet!" (for when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off). "Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears? I'm sure I shan't be able! I shall be a great deal too far off to take care of you: you must manage the best way you can; — but I must be kind to them," thought Alice, "or perhaps they won't walk the way I want to go! Let me see: I'll give them a new pair of boots every Christmas."

And she went on planning to herself how she would manage it. "They must go by the carrier," she thought; "and how funny it'll seem, sending presents to one's own feet! And how odd the directions will look!
Alice's Right Foot, Esq.
Hearthrug,
near the Fender,
(with Alice's love).
Oh dear, what nonsense I'm talking!"

Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.`
      },
      {
        title: "Chapter III: A Caucus-Race and a Long Tale",
        content: `They were indeed a queer-looking party that assembled on the bank—the birds with draggled feathers, the animals with their fur clinging close to them, and all dripping wet, cross, and uncomfortable.

The first question of course was, how to get dry again: they had a consultation about this, and after a few minutes it seemed quite natural to Alice to find herself talking familiarly with them, as if she had known them all her life. Indeed, she had quite a long argument with the Lory, who at last turned sulky, and would only say, "I am older than you, and must know better"; and this Alice would not allow without knowing how old it was, and, as the Lory positively refused to tell its age, there was no more to be said.

At last the Mouse, who seemed to be a person of authority among them, called out, "Sit down, all of you, and listen to me! I'll soon make you dry enough!" They all sat down at once, in a large ring, with the Mouse in the middle. Alice kept her eyes anxiously fixed on it, for she felt sure she would catch a bad cold if she did not get dry very soon.`
      }
    ]
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    subGenres: ["Classics", "Drama", "Literature"],
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    color: "#e84393",
    rating: 4.9,
    ratingsCount: 2890,
    pages: 279,
    readTime: "7.0 hrs",
    language: "English",
    featured: true,
    trending: true,
    description: "A timeless romantic masterpiece exploring manners, upbringing, morality, and marriage in Regency England.",
    gutenbergId: 1342,
    downloadUrl: "https://www.gutenberg.org/ebooks/1342",
    chapters: [
      {
        title: "Chapter 1",
        content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? How can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."`
      },
      {
        title: "Chapter 2",
        content: `Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid she had no knowledge of it. It was then disclosed in the following manner. Observing his second daughter employed in trimming a hat, he suddenly addressed her with:

"I hope Mr. Bingley will like it, Lizzy."

"We are not in a way to know what Mr. Bingley likes," said her mother resentfully, "since we are not to visit."

"But you forget, mamma," said Elizabeth, "that we shall meet him at the assemblies, and that Mrs. Long promised to introduce him."

"I do not believe Mrs. Long will do any such thing. She has two nieces of her own. She is a selfish, hypocritical woman, and I have no opinion of her."

"No more have I," said Mr. Bennet; "and I am glad to find that you do not depend on her serving you."

Mrs. Bennet deigned not to make any reply, but, unable to contain herself, began scolding one of her daughters.`
      }
    ]
  },
  {
    id: "frankenstein",
    title: "Frankenstein; Or, The Modern Prometheus",
    author: "Mary Shelley",
    year: 1818,
    genre: "Sci-Fi",
    subGenres: ["Horror", "Gothic", "Classics"],
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    color: "#00b894",
    rating: 4.7,
    ratingsCount: 1950,
    pages: 220,
    readTime: "5.5 hrs",
    language: "English",
    featured: true,
    trending: false,
    description: "The pioneering science fiction tale of Victor Frankenstein and the conscious monster he creates in an unorthodox experiment.",
    gutenbergId: 84,
    downloadUrl: "https://www.gutenberg.org/ebooks/84",
    chapters: [
      {
        title: "Letter 1",
        content: `To Mrs. Saville, England.
St. Petersburgh, Dec. 11th, 17—.

You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.

I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight.`
      },
      {
        title: "Chapter 4: The Creation",
        content: `It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.

How can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath; his hair was of a lustrous black, and flowing; his teeth of a pearly whiteness; but these luxuriances only formed a more horrid contrast with his watery eyes, that seemed almost of the same colour as the dun-white sockets in which they were set, his shrivelled complexion and straight black lips.`
      }
    ]
  },
  {
    id: "sherlock-holmes",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    year: 1892,
    genre: "Mystery",
    subGenres: ["Detective", "Crime", "Classics"],
    cover: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?auto=format&fit=crop&w=600&q=80",
    color: "#2d3436",
    rating: 4.9,
    ratingsCount: 3120,
    pages: 307,
    readTime: "8.0 hrs",
    language: "English",
    featured: true,
    trending: true,
    description: "Twelve classic short stories detailing the remarkable deductive cases of the quintessential consulting detective.",
    gutenbergId: 1661,
    downloadUrl: "https://www.gutenberg.org/ebooks/1661",
    chapters: [
      {
        title: "A Scandal in Bohemia",
        content: `To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind.

He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil from men's motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results.

One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient, when my way led me through Baker Street. As I passed the well-remembered door, which must always be associated in my mind with my wooing, and with the dark incidents of the Study in Scarlet, I was seized with a keen desire to see Holmes again, and to know how he was employing his extraordinary powers.`
      },
      {
        title: "The Red-Headed League",
        content: `I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair. With an apology for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door behind me.

"You could not have come at a better time, my dear Watson," he said cordially.

"I was afraid that you were engaged."

"So I am. Very much so."

"Then I can wait in the next room."

"Not at all. This gentleman, Mr. Wilson, has been my partner and helper in many of my most successful cases, and I have no doubt that he will be of the utmost use to me in yours also."`
      }
    ]
  },
  {
    id: "the-time-machine",
    title: "The Time Machine",
    author: "H. G. Wells",
    year: 1895,
    genre: "Sci-Fi",
    subGenres: ["Dystopian", "Adventure", "Classics"],
    cover: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=600&q=80",
    color: "#0984e3",
    rating: 4.6,
    ratingsCount: 1640,
    pages: 118,
    readTime: "3.0 hrs",
    language: "English",
    featured: false,
    trending: true,
    description: "A Victorian scientist invents a machine that transports him to the year AD 802,701, uncovering the Eloi and the underground Morlocks.",
    gutenbergId: 35,
    downloadUrl: "https://www.gutenberg.org/ebooks/35",
    chapters: [
      {
        title: "Chapter 1: The Invention",
        content: `The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burnt brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses.

"You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. The geometry, for instance, they taught you at school is founded on a misconception."

"Is not that rather a large thing to expect us to begin upon?" said Filby, an argumentative person with red hair.

"I do not mean to ask you to accept anything without reasonable ground for it. You will soon admit as much as I need from you. You know of course that a mathematical line, a line of thickness nil, has no real existence. They taught you that? Nor has a mathematical plane. These things are mere abstractions."

"That is all right," said the Psychologist.

"Nor, having only length, breadth, and thickness, can a cube have a real existence."

"There I object," said Filby. "Of course a solid body may exist. All real things—"

"So most people think. But wait a moment. Can an instantaneous cube exist?"

"Don't follow you," said Filby.

"Can a cube that does not exist for any time at all, have an existence?"`
      }
    ]
  },
  {
    id: "art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    year: -500,
    genre: "Philosophy",
    subGenres: ["Strategy", "History", "Non-Fiction"],
    cover: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    color: "#d63031",
    rating: 4.8,
    ratingsCount: 4500,
    pages: 96,
    readTime: "2.0 hrs",
    language: "English",
    featured: true,
    trending: true,
    description: "An ancient Chinese military treatise attributed to Sun Tzu, composed of 13 chapters devoted to tactical thought.",
    gutenbergId: 17405,
    downloadUrl: "https://www.gutenberg.org/ebooks/17405",
    chapters: [
      {
        title: "Chapter 1: Laying Plans",
        content: `Sun Tzu said: The art of war is of vital importance to the State.

It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.

The art of war, then, is governed by five constant factors, to be taken into account in one's deliberations, when seeking to determine the conditions obtaining in the field.

These are: (1) The Moral Law; (2) Heaven; (3) Earth; (4) The Commander; (5) Method and discipline.

The MORAL LAW causes the people to be in complete accord with their ruler, so that they will follow him regardless of their lives, undismayed by any danger.

HEAVEN signifies night and day, cold and heat, times and seasons.

EARTH comprises distances, great and small; danger and security; open ground and narrow passes; the chances of life and death.

The COMMANDER stands for the virtues of wisdom, sincerely, benevolence, courage and strictness.

By METHOD AND DISCIPLINE are to be understood the marshaling of the army in its proper subdivisions, the graduations of rank among the officers, the maintenance of roads by which supplies may reach the army, and the control of military expenditure.`
      },
      {
        title: "Chapter 3: Attack by Stratagem",
        content: `Sun Tzu said: In the practical art of war, the best thing of all is to take the enemy's country whole and intact; to shatter and destroy it is not so good. So, too, it is better to recapture an army entire than to destroy it.

Hence to fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy's resistance without fighting.

Thus the highest form of generalship is to balk the enemy's plans; the next best is to prevent the junction of the enemy's forces; the next in order is to attack the enemy's army in the field; and the worst policy of all is to besiege walled cities.

If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.`
      }
    ]
  },
  {
    id: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    year: 1897,
    genre: "Horror",
    subGenres: ["Gothic", "Vampire", "Classics"],
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    color: "#636e72",
    rating: 4.7,
    ratingsCount: 2210,
    pages: 418,
    readTime: "10.0 hrs",
    language: "English",
    featured: false,
    trending: true,
    description: "The classic epistolary tale of Count Dracula's attempt to move from Transylvania to England to spread the undead curse.",
    gutenbergId: 345,
    downloadUrl: "https://www.gutenberg.org/ebooks/345",
    chapters: [
      {
        title: "Chapter 1: Jonathan Harker's Journal",
        content: `3 May. Bistritz.—Left Munich at 8:35 P. M., on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late. Buda-Pesth seems a wonderful place, from the glimpse which I got of it from the train and the little I could see from the streets. I feared to go very far from the station, as we had arrived late and would start as near the correct time as possible.

The impression I had was that we were leaving the West and entering the East; the most western of splendid bridges over the Danube, which is here of noble width and depth, took us among the traditions of Turkish rule.

We left in pretty good time, and came after nightfall to Klausenburgh. Here I stopped for the night at the Hotel Royale. I had for dinner, or rather supper, a chicken done up some way with red pepper, which was very good but thirsty. (Mem., get recipe for Mina.) I asked the waiter, and he said it was called "paprika hendl," and that, as it was a national dish, I should be able to get it anywhere along the Carpathians.`
      },
      {
        title: "Chapter 2: Castle Dracula",
        content: `5 May.—I must have been asleep, for certainly if I had been fully awake I must have noticed the approach of so remarkable a place. In the gloom the courtyard looked of considerable size, and as several dark ways led from it under great round arches, it seemed much larger than it really was. I have not yet been able to see it by daylight.

When the calèche stopped, the driver jumped down and held out his hand to assist me to alight. Again I could not but notice his prodigious strength. His hand actually seemed like a steel vice that could have crushed mine if he had chosen. Then he took out my traps, and placed them on the ground beside me as I stood close to a great door, old and studded with large iron nails, and set in a heavy stone doorway with projecting masonry.`
      }
    ]
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    genre: "Philosophy",
    subGenres: ["Stoicism", "Self-Help", "Classics"],
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    color: "#b2bec3",
    rating: 4.9,
    ratingsCount: 3870,
    pages: 180,
    readTime: "4.5 hrs",
    language: "English",
    featured: true,
    trending: true,
    description: "Personal writings by Roman Emperor Marcus Aurelius recording his private notes to himself on Stoic philosophy.",
    gutenbergId: 2680,
    downloadUrl: "https://www.gutenberg.org/ebooks/2680",
    chapters: [
      {
        title: "Book II: On the River Gran",
        content: `When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil.

But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own—not of the same blood or birth, but the same mind, and possessing a share of the divine.

And so none of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my relative, or hate him. We were made to work together like feet, like hands, like the rows of the upper and lower teeth. To obstruct each other is unnatural. To feel anger at someone, to turn your back on him: these are obstructions.

Whatever this is that I am, it is a little flesh and breath, and the ruling part. Despise the flesh: blood and bones and a network, a jumble of nerves, veins, and arteries. Consider the breath: wind, always changing, expelled and sucked back again. Third is the ruling master part: Put away your books; no more distraction, it is not allowed.`
      },
      {
        title: "Book IV",
        content: `Men seek retreats for themselves, houses in the country, sea-shores, and mountains; and you too are wont to desire such things very much. But this is altogether a mark of the most common sort of men, since it is in your power whenever you shall choose to retire into yourself.

For nowhere either with more quiet or more freedom from trouble does a man retire than into his own soul, particularly when he has within him such thoughts that by looking into them he is immediately in perfect tranquility; and I affirm that tranquility is nothing else than the good ordering of the mind.

Constantly then give to yourself this retreat, and renew yourself; and let your basic principles be brief and fundamental, which, as soon as you have them in mind, will at once cleanse your soul and send you back without any discontent to the things to which you must return.`
      }
    ]
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1890,
    genre: "Drama",
    subGenres: ["Gothic", "Psychological", "Classics"],
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    color: "#a29bfe",
    rating: 4.8,
    ratingsCount: 2650,
    pages: 254,
    readTime: "6.0 hrs",
    language: "English",
    featured: false,
    trending: true,
    description: "A philosophical story of a young man whose portrait ages and records his sins while he remains perpetually youthful.",
    gutenbergId: 174,
    downloadUrl: "https://www.gutenberg.org/ebooks/174",
    chapters: [
      {
        title: "The Preface & Chapter 1",
        content: `The artist is the creator of beautiful things. To reveal art and conceal the artist is art's aim. The critic is he who can translate into another manner or a new material his impression of beautiful things.

The highest as the lowest form of criticism is a mode of autobiography. Those who find ugly meanings in beautiful things are corrupt without being charming. This is a fault. Those who find beautiful meanings in beautiful things are the cultivated. For these there is hope.

The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.

From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flame-like as their own.`
      }
    ]
  },
  {
    id: "call-of-the-wild",
    title: "The Call of the Wild",
    author: "Jack London",
    year: 1903,
    genre: "Adventure",
    subGenres: ["Nature", "Survival", "Classics"],
    cover: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
    color: "#e67e22",
    rating: 4.7,
    ratingsCount: 1830,
    pages: 128,
    readTime: "3.2 hrs",
    language: "English",
    featured: false,
    trending: false,
    description: "The thrilling tale of Buck, a domesticated dog snatched from his comfortable life in California and cast into the harsh Alaskan gold rush.",
    gutenbergId: 215,
    downloadUrl: "https://www.gutenberg.org/ebooks/215",
    chapters: [
      {
        title: "Chapter I: Into the Primitive",
        content: `Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tide-water dog, strong of muscle and with long, warm hair, from Puget Sound to San Diego. Because men, groping in the Arctic darkness, had found a yellow metal, and because steamship and transportation companies were booming the find, thousands of men were rushing into the Northland.

Buck lived at a big house in the sun-kissed Santa Clara Valley. Judge Miller's place, it was called. It stood back from the road, half hidden among the trees, through which glimpses could be caught of the wide cool veranda that ran around its four sides.

And over this great demesne Buck ruled. Here he was born, and here he had lived the four years of his life. It was true, there were other dogs. There could not but be other dogs on so vast a place, but they did not count. Nobody bothered Buck. He was king,—king over all creeping, crawling, flying things of Judge Miller's place, humans included.`
      }
    ]
  },
  {
    id: "romeo-and-juliet",
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    year: 1597,
    genre: "Drama",
    subGenres: ["Romance", "Poetry", "Tragedy"],
    cover: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    color: "#fd79a8",
    rating: 4.8,
    ratingsCount: 3410,
    pages: 190,
    readTime: "4.0 hrs",
    language: "English",
    featured: false,
    trending: true,
    description: "The tragic tale of two star-crossed young lovers whose deaths ultimately reconcile their feuding families.",
    gutenbergId: 1513,
    downloadUrl: "https://www.gutenberg.org/ebooks/1513",
    chapters: [
      {
        title: "Prologue & Act I, Scene I",
        content: `PROLOGUE

Two households, both alike in dignity,
In fair Verona, where we lay our scene,
From ancient grudge break to new mutiny,
Where civil blood makes civil hands unclean.
From forth the fatal loins of these two foes
A pair of star-cross'd lovers take their life;
Whose misadventur'd piteous overthrows
Do with their death bury their parents' strife.
The fearful passage of their death-mark'd love,
And the continuance of their parents' rage,
Which, but their children's end, nought could remove,
Is now the two hours' traffic of our stage;
The which if you with patient ears attend,
What here shall miss, our toil shall strive to mend.`
      },
      {
        title: "Act II, Scene II: The Balcony",
        content: `ROMEO:
He jests at scars that never felt a wound.
[Juliet appears above at a window.]
But, soft! what light through yonder window breaks?
It is the east, and Juliet is the sun.
Arise, fair sun, and kill the envious moon,
Who is already sick and pale with grief,
That thou her maid art far more fair than she:
Be not her maid, since she is envious;
Her vestal livery is but sick and green
And none but fools do wear it; cast it off.
It is my lady, O, it is my love!
O, that she knew she were!`
      }
    ]
  },
  {
    id: "jekyll-and-hyde",
    title: "The Strange Case of Dr. Jekyll and Mr. Hyde",
    author: "Robert Louis Stevenson",
    year: 1886,
    genre: "Horror",
    subGenres: ["Sci-Fi", "Mystery", "Classics"],
    cover: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80",
    color: "#2c3e50",
    rating: 4.6,
    ratingsCount: 1720,
    pages: 144,
    readTime: "3.5 hrs",
    language: "English",
    featured: false,
    trending: false,
    description: "A London lawyer investigates strange occurrences between his old friend, Dr. Henry Jekyll, and the evil Edward Hyde.",
    gutenbergId: 43,
    downloadUrl: "https://www.gutenberg.org/ebooks/43",
    chapters: [
      {
        title: "Story of the Door",
        content: `Mr. Utterson the lawyer was a man of a rugged countenance that was never lighted by a smile; cold, scanty and embarrassed in discourse; backward in sentiment; lean, long, dusty, dreary and yet somehow loveable. At friendly meetings, and when the wine was to his taste, something eminently human beaconed from his eye; not indeed found in talk, but which spoke only in these silent symbols of the after-dinner face, but more often and loudly in the acts of his life.

He was austere with himself; drank gin when he was alone, to mortify a taste for vintages; and though he enjoyed the theatre, had not crossed the doors of one for twenty years. But he had an approved tolerance for others; wondering almost with envy at the high pressure of spirits involved in their misdeeds; and in any extremity inclined to help rather than to reprove.`
      }
    ]
  },
  {
    id: "twenty-thousand-leagues",
    title: "Twenty Thousand Leagues Under the Sea",
    author: "Jules Verne",
    year: 1870,
    genre: "Sci-Fi",
    subGenres: ["Adventure", "Ocean", "Classics"],
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    color: "#0984e3",
    rating: 4.7,
    ratingsCount: 2190,
    pages: 388,
    readTime: "9.5 hrs",
    language: "English",
    featured: true,
    trending: false,
    description: "Captain Nemo embarks on a worldwide undersea voyage aboard the fantastical submarine Nautilus.",
    gutenbergId: 164,
    downloadUrl: "https://www.gutenberg.org/ebooks/164",
    chapters: [
      {
        title: "Chapter 1: A Shifting Reef",
        content: `The year 1866 was signalised by a remarkable incident, a mysterious and puzzling phenomenon, which doubtless no one has yet forgotten. Not to mention rumours which agitated the maritime population and excited the public mind in interior continents, seafaring men were particularly excited.

Merchants, common sailors, captains of vessels, skippers, both of Europe and America, naval officers of all countries, and the Governments of several States on the two continents, were deeply interested in the matter.

For some time past vessels had been met by "an enormous thing," a long object, spindle-shaped, occasionally phosphorescent, and infinitely larger and more rapid in its movements than a whale.`
      }
    ]
  },
  {
    id: "grimms-fairy-tales",
    title: "Grimm's Fairy Tales",
    author: "The Brothers Grimm",
    year: 1812,
    genre: "Fantasy",
    subGenres: ["Folklore", "Children", "Classics"],
    cover: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80",
    color: "#6c5ce7",
    rating: 4.8,
    ratingsCount: 2950,
    pages: 320,
    readTime: "7.5 hrs",
    language: "English",
    featured: false,
    trending: true,
    description: "A famous collection of German folklore and fairy tales including Cinderella, Hansel and Gretel, Rapunzel, and more.",
    gutenbergId: 2591,
    downloadUrl: "https://www.gutenberg.org/ebooks/2591",
    chapters: [
      {
        title: "The Frog Prince",
        content: `In olden times when wishing still helped one, there lived a king whose daughters were all beautiful; and the youngest was so beautiful that the sun itself, which has seen so much, was astonished whenever it shone in her face. Close by the king's castle lay a great dark forest, and under an old lime-tree in the forest was a well, and when the day was very warm, the king's child went out into the forest and sat down by the side of the cool fountain; and when she was bored she took a golden ball, and threw it up on high and caught it; and this ball was her favorite plaything.

Now it so happened on one occasion that the princess's golden ball did not fall into the little hand which she was holding up for it, but on to the ground beyond, and rolled straight into the water. The king's daughter followed it with her eyes, but it vanished, and the well was deep, so deep that the bottom could not be seen.`
      },
      {
        title: "Hansel and Gretel",
        content: `Hard by a great forest dwelt a poor wood-cutter with his wife and his two children. The boy was called Hansel and the girl Gretel. He had little to bite and to break, and once when great dearth fell on the land, he could no longer procure even daily bread. Now when he thought over this by night in his bed, and tossed about in his anxiety, he groaned and said to his wife: "What is to become of us? How are we to feed our poor children, when we no longer have anything even for ourselves?"

"I'll tell you what, husband," answered the woman, "early tomorrow morning we will take the children out into the forest to where it is the thickest; there we will make a fire for them, and give each of them one more piece of bread, and then we will go to our work and leave them alone. They will not find the way home again, and we shall be rid of them."`
      }
    ]
  },
  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Drama",
    subGenres: ["Classics", "Literature", "Romance"],
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
    color: "#f39c12",
    rating: 4.8,
    ratingsCount: 3950,
    pages: 180,
    readTime: "4.5 hrs",
    language: "English",
    featured: true,
    trending: true,
    description: "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby.",
    gutenbergId: 64317,
    downloadUrl: "https://www.gutenberg.org/ebooks/64317",
    chapters: [
      {
        title: "Chapter 1",
        content: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men.`
      }
    ]
  }
];

// Helper functions for genres & statistics
const GENRES = ["All", "Fantasy", "Sci-Fi", "Mystery", "Philosophy", "Horror", "Drama", "Romance", "Adventure"];

function getAllBooks() {
  return BOOKS_DATA;
}

function getBookById(id) {
  return BOOKS_DATA.find(b => b.id === id);
}

function getFeaturedBooks() {
  return BOOKS_DATA.filter(b => b.featured);
}

function getTrendingBooks() {
  return BOOKS_DATA.filter(b => b.trending);
}

function getBooksByGenre(genre) {
  if (!genre || genre === "All") return BOOKS_DATA;
  return BOOKS_DATA.filter(b => b.genre.toLowerCase() === genre.toLowerCase() || (b.subGenres && b.subGenres.some(sg => sg.toLowerCase() === genre.toLowerCase())));
}


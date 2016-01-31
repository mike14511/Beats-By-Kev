
/**
 * This file contains sentences and data structures for testing
 */

/**
 * Step 0
 */
module.exports.samples = [
    'The mockingbird sings a sad, sad song.',
    'The diamond ring shines in the moonlight.',
    'The angry king executed the prisoner.',
    'The silver flute plays a sweet melody.',
    'The swing sways in the breeze.',
    'The dramatic play entertained the common folk.',
    'The ray stung Steve Irwin.',
    'The root tripped the weary traveler.',
    'The ship docks at sunrise.',
    'The purple clock strikes two.',
    'The motorbike rides into the sunset.',
    'The tides change with the moon.',
    'The range hosted animals of all kinds.',
    'The spooky ghost scared the curious children.',
    'The hare raced the tortoise',
    'The train arrived at the station.',
    'The maple tree grows tall.',
    'The peaceful monk rests on the shore.',
    'Kanye West sings about heartbreak and stuff.',
    'Kanye West interrupted Taylor Swift.',
    'Kanye West brags about how awesome he is.',
    'Santa\'s bag holds many toys.',
    'The black mold infects many lungs.',
    'The professor tests his students.',
    'The comedian jests with his colleagues.',
    'The Olympian bests all of her competitors.',
    'The oily rag burns with the fire of a thousand suns.',
    'The American Flag waves in the wind.'
]



/**
 * Step 0: sentences
 */
var sents0 = [
    'The mockingbird sings.',
    'The ring shines in the moonlight.',
    'The mine exploded under the villagers.',
    'The toad croaked amongs the flies.',
    'The cloak hid Harry from Filch'
]

/**
 * Step 1: relations
 */
var rels0 = [
    {
        subject: 'mockingbird',
        action: 'sing'
    },
    {
        subject: 'ring',
        action: 'shine'
    },
    {
        subject: 'mine',
        action: 'explode'
    },
    {
        subject: 'toad',
        action: 'croak'
    },
    {
        subject: 'cloak',
        action: 'hide'
    }
]


/**
 * Step 2: redis store
 */
var redis0 = [ 
    {
        key: 'MB.Nouns.MOCKINGBIRD',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Verbs.',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Nouns.Ring',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Verbs.',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Nouns.Mine',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Verbs.',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Nouns.Toad',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Verbs.',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Nouns.Cloak',
        val: { rels: [''], rhymes: [] }
    },
    {
        key: 'MB.Verbs.',
        val: { rels: [''], rhymes: [] }
    }
]


/**
 * Generate....
 * start w/ get all redis keys.... start w/ first one... 
 *   MB.Nouns.MOCKINGBIRD.... what are it's related verbs?
 *     MB.Verbs.SING... what are nouns that rhyme with it? (how do we do this?)
 */


module.testSet0 = {
    sents: sents0,
    rels: rels0
}




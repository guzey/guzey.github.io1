### PROBLEM: NEED TO MAKE A TON OF ad hoc ASSUMPTIONS ABOUT e.g. FITNESS ADVANTAGES
# don't think there's a solution tho

# done:
#   selection
#   meiosis
#   nucleotide mutation
#   gene duplication
#   to do:
#   gene --> function map (genes encode body part, right after initial values)
#   then there's a neural network learning
#   and as result best initial values survive
#   maybe add garbage genes for sexual selection?
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as stats


def create_population(initial_population_size, initial_genome_size, initial_genome_size_spread):
    # initially creatures are haploid, they become diploid during meiosis (like fungi)
    population = [[] for _ in range(initial_population_size)]

    # creating random variable for nucleotide value
    lower, upper = -2, 2
    mu, sigma = 0, 1
    # truncated normal with mean mu, std sigma and lower and upper bounds
    trunc_norm = stats.truncnorm(
        (lower - mu) / sigma, (upper - mu) / sigma, loc=mu, scale=sigma)

    # setting nucleotide values for first number_of_potent_genes for each creature
    for creature in population:
        potent_genome_size = np.random.randint(initial_genome_size-initial_genome_size_spread,
                                               initial_genome_size+initial_genome_size_spread)
        nucleotide_value = trunc_norm.rvs(potent_genome_size)
        for gene in range(0, potent_genome_size):
            creature.append(nucleotide_value[gene])

    return population


# REPRODUCTIVE CYCLE BEGINS
def life(population, number_of_generations):

    population_size = len(population)
    # geometric distribution with mean of 1/fitness_pressure of the population size
    # indicates relative probability of being picked for reproduction, based on
    # fitness rank in the population (creatures should be pre-ranked on fitness)
    # fitness_pressure increases the steepness of CDF
    fitness_pressure = 4  # < population length
    # probability of mutation per nucleotide is such that we expect
    # mutation_rate mutations per creature per generation
    mutation_rate = 1
    gene_duplication_rate = 1

    # demo fitness is just the sum of nucleotide weights
    def sum_fitness_in_population(population):
        fitness_in_population = [sum(creature) for creature in population]
        return fitness_in_population

    average_variance_in_population_over_life = []
    average_fitness_in_population_over_life = []
    size_of_population_over_life = []
    genome_length_of_most_fit_creature = []

    for generation in range(0, number_of_generations):

        # during mating two haploid organisms create a diploid zygote
        # creatures that mate are randomly paired (they're already shuffled
        zygotes = []

        # replication
        while len(zygotes) < population_size:

            first_creature_id = int(np.random.geometric(fitness_pressure / population_size, 1)-1)
            # second creature is picked randomly
            second_creature_id = int(np.random.randint(0, population_size))
            # mutate and fertilize!
            if first_creature_id < population_size and second_creature_id < population_size:
                if first_creature_id != second_creature_id:
                    # gene duplication
                    # only first creature mutates
                    first_creature_genome_length = len(population[first_creature_id])
                    if np.random.random() < gene_duplication_rate / first_creature_genome_length:
                        duplication_start = np.random.randint(0, first_creature_genome_length)
                        duplication_end = min(duplication_start + np.random.randint(1, 3), first_creature_genome_length)
                        population[first_creature_id][duplication_start:duplication_start] =\
                            population[first_creature_id][duplication_start:duplication_end]
                    # mutation
                    # only first creature mutates
                    first_creature_genome_length = len(population[first_creature_id])
                    for nucleotide_id in range(0, first_creature_genome_length):
                        if np.random.random() < mutation_rate / first_creature_genome_length:
                            population[first_creature_id][nucleotide_id] =\
                                population[first_creature_id][nucleotide_id] + np.power(-1, np.random.randint(1, 3))

                    # fertilization
                    zygotes.append([population[first_creature_id], population[second_creature_id]])

        # now we have diploid zygotes and we need to create haploid creatures out of them
        # there's two chromosome only per diploid creature
        population = []
        for zygote in zygotes:
            genetic_code = []
            current_location = 0
            # randomly get sequences of 1 to 16 nucleotides from each chromosome
            while True:
                which_homolog = np.random.randint(0, 2)
                sequence_length = np.random.randint(1, 17)
                genetic_code.extend(zygote[which_homolog][current_location:current_location+sequence_length])
                current_location += sequence_length
                if current_location >= len(zygote[which_homolog]):
                    break
            population.append(genetic_code)
        population_size = len(population)
        population = sorted(population, reverse=True)
        fitness_of_creatures = sum_fitness_in_population(population)

        size_of_population_over_life.append(len(population))
        average_variance_in_population_over_life.append(np.var(fitness_of_creatures))
        average_fitness_in_population_over_life.append(np.mean(fitness_of_creatures))
        genome_length_of_most_fit_creature.append(len(population[0]))

    return size_of_population_over_life,\
           average_variance_in_population_over_life,\
           average_fitness_in_population_over_life,\
           genome_length_of_most_fit_creature


def main():

    population = create_population(initial_population_size=128,
                                   initial_genome_size=128,
                                   initial_genome_size_spread=8)
    size, var, fit, gen_len = life(population, number_of_generations=3000)

    # print("Size of the population: ", size)
    # print("Variance of fitness in population: ", var)
    # print("Average fitness of creatures in population: ", fit)
    print("Genome length of the most fit creature: ", gen_len)

    # plot of average fitness of population over time
    plt.plot(fit)
    plt.show()

    # sum_fit = 0
    # for _ in range(0,100):
    #     population = create_population(initial_population_size=128,
    #                                    initial_genome_size=128,
    #                                    initial_genome_size_spread=8)
    #     size, var, fit, gen_len = life(population, number_of_generations=200)
    #     sum_fit += fit[-1]
    # sum_fit = sum_fit / 100
    # print("avg fit over 100 gen: ", sum_fit)


if __name__ == "__main__":
    main()
